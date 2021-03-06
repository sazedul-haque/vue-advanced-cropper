<script>
import classnames from 'classnames';
import bem from 'easy-bem';
import debounce from 'debounce';
import { RectangleStencil } from './components/stencils';
import { CropperWrapper } from './components/service';
import { fillBoundaries, fitBoundaries, isFunction, isLoadedImage, limitBy, replacedProp } from './core';
import { ManipulateImageEvent } from './core/events';
import { limitSizeRestrictions } from './core/service';
import { isLocal, isCrossOriginURL, isUndefined, getSettings, parseNumber } from './core/utils';
import { arrayBufferToDataURL, getImageTransforms, getStyleTransforms, prepareSource, parseImage } from './core/image';
import { IMAGE_RESTRICTIONS, DEFAULT_COORDINATES } from './core/constants';
import * as algorithms from './core/algorithms';

const cn = bem('vue-advanced-cropper');

export default {
	name: 'Cropper',
	components: {
		CropperWrapper,
	},
	props: {
		src: {
			type: String,
			default: null,
		},
		stencilComponent: {
			type: [Object, String],
			default() {
				return RectangleStencil;
			},
		},
		stencilProps: {
			type: Object,
			default() {
				return {};
			},
		},
		imageClass: {
			type: String,
		},
		areaClass: {
			type: String,
		},
		backgroundClass: {
			type: String,
		},
		minWidth: {
			type: [Number, String],
		},
		minHeight: {
			type: [Number, String],
		},
		maxWidth: {
			type: [Number, String],
		},
		maxHeight: {
			type: [Number, String],
		},
		debounce: {
			type: [Boolean, Number],
			default: 500,
		},
		canvas: {
			type: Boolean,
			default: true,
		},
		checkOrientation: {
			type: Boolean,
			default: true,
		},
		crossOrigin: {
			type: String,
			default: 'anonymous',
		},
		transitionTime: {
			type: Number,
			default: 300,
		},
		wheelResize: {
			type: [Boolean, Object],
			default: true,
		},
		touchResize: {
			type: [Boolean, Object],
			default: true,
		},
		touchMove: {
			type: [Boolean, Object],
			default: true,
		},
		mouseMove: {
			type: [Boolean, Object],
			default: true,
		},
		imageRestriction: {
			type: String,
			default: 'area',
			validator(value) {
				return IMAGE_RESTRICTIONS.indexOf(value) !== -1;
			},
		},
		roundResult: {
			type: Boolean,
			default: true,
		},
		resizeAlgorithm: {
			type: Function,
			default: algorithms.resize,
		},
		moveAlgorithm: {
			type: Function,
			default: algorithms.move,
		},
		initStretcher: {
			type: Function,
			default: algorithms.initStretcher,
		},
		fitCoordinates: {
			type: Function,
			default: algorithms.fitCoordinates,
		},
		fitVisibleArea: {
			type: Function,
			default: algorithms.fitVisibleArea,
		},
		defaultVisibleArea: {
			type: [Function, Object],
			default: algorithms.defaultVisibleArea,
		},
		defaultSize: {
			type: [Function, Object],
			default: algorithms.defaultSize,
		},
		defaultPosition: {
			type: [Function, Object],
			default: algorithms.defaultPosition,
		},
		defaultBoundaries: {
			type: [Function, String],
			default: algorithms.fitBoundaries,
			validator(value) {
				const invalid = typeof value === 'string' && value !== 'fill' && value !== 'fit';
				if (invalid) {
					if (process.env.NODE_ENV !== 'production') {
						console.warn(
							`Warning: prop "defaultBoundaries" gets incorrect string value ${value}. It should be either function, 'fill' or 'fit'`,
						);
					}
				}
				return !invalid;
			},
		},
		areaRestrictionsAlgorithm: {
			type: Function,
			default: algorithms.areaRestrictions,
		},
		sizeRestrictionsAlgorithm: {
			type: Function,
			default: algorithms.percentRestrictions,
		},
		positionRestrictionsAlgorithm: {
			type: Function,
			default: algorithms.positionRestrictions,
		},
		priority: {
			type: String,
			default: 'coordinates',
		},
		// Deprecated props
		restrictions: {
			type: Function,
			validator(value) {
				return replacedProp(value, 'restrictions', 'sizeRestrictionsAlgorithm');
			},
		},
		classname: {
			type: String,
			validator(value) {
				return replacedProp(value, 'classname', 'class');
			},
		},
		imageClassname: {
			type: String,
			validator(value) {
				return replacedProp(value, 'imageClassname', 'imageClass');
			},
		},
		areaClassname: {
			type: String,
			validator(value) {
				return replacedProp(value, 'areaClassname', 'areaClass');
			},
		},
		backgroundClassname: {
			type: String,
			validator(value) {
				return replacedProp(value, 'backgroundClassname', 'backgroundClass');
			},
		},
	},
	data() {
		return {
			imageLoaded: false,
			imageAttributes: {
				crossOrigin: false,
				src: null,
			},
			basicImageTransforms: {
				rotate: null,
				scaleX: null,
				scaleY: null,
			},
			imageSize: {
				width: null,
				height: null,
			},
			boundaries: {
				width: null,
				height: null,
			},
			visibleArea: null,
			coordinates: {
				...DEFAULT_COORDINATES,
			},
		};
	},
	computed: {
		initialized() {
			return Boolean(this.visibleArea && this.imageLoaded);
		},
		settings() {
			return {
				resize: getSettings(this.resize, {
					stencil: false,
				}),
				touchResize: getSettings(this.touchResize),
				touchMove: getSettings(this.touchMove),
				mouseMove: getSettings(this.mouseMove),
				wheelResize: getSettings(this.wheelResize, {
					ratio: 0.1,
				}),
			};
		},
		coefficient() {
			return this.visibleArea ? this.visibleArea.width / this.boundaries.width : 0;
		},
		areaRestrictions() {
			if (this.imageLoaded) {
				return this.areaRestrictionsAlgorithm({
					imageSize: this.imageSize,
					imageRestriction: this.imageRestriction,
				});
			} else {
				return {};
			}
		},
		areaStyle() {
			return {
				width: this.boundaries.width ? `${this.boundaries.width}px` : 'auto',
				height: this.boundaries.height ? `${this.boundaries.height}px` : 'auto',
				opacity: this.imageLoaded ? 1 : 0,
				transition: `opacity ${this.transitionTime}ms`,
				pointerEvents: this.imageLoaded ? 'all' : 'none',
			};
		},
		imageStyle() {
			const result = {
				left: `${this.imageSize.width / (2 * this.coefficient) - this.imageTransforms.translateX}px`,
				top: `${this.imageSize.height / (2 * this.coefficient) - this.imageTransforms.translateY}px`,
				transform: 'translate(-50%, -50%)' + getStyleTransforms(this.imageTransforms),
			};

			const { flipped } = this.imageTransforms;
			if (flipped) {
				result.width = `${this.imageSize.height / this.coefficient}px`;
				result.height = `${this.imageSize.width / this.coefficient}px`;
			} else {
				result.width = `${this.imageSize.width / this.coefficient}px`;
				result.height = `${this.imageSize.height / this.coefficient}px`;
			}
			return result;
		},
		sizeRestrictions() {
			if (this.boundaries.width && this.boundaries.height) {
				const sizeRestrictions = (this.restrictions || this.sizeRestrictionsAlgorithm)({
					imageSize: this.imageSize,
					minWidth: !isUndefined(this.minWidth) ? parseNumber(this.minWidth) : 0,
					minHeight: !isUndefined(this.minHeight) ? parseNumber(this.minHeight) : 0,
					maxWidth: !isUndefined(this.maxWidth) ? parseNumber(this.maxWidth) : Infinity,
					maxHeight: !isUndefined(this.maxHeight) ? parseNumber(this.maxHeight) : Infinity,
					// Deprecated params
					imageWidth: this.imageSize.width,
					imageHeight: this.imageSize.height,
					props: this.$props,
				});

				return algorithms.refineSizeRestrictions({
					sizeRestrictions,
					imageSize: this.imageSize,
					boundaries: this.boundaries,
					positionRestrictions: this.positionRestrictions,
					imageRestriction: this.imageRestriction,
				});
			} else {
				return {
					minWidth: 0,
					minHeight: 0,
					maxWidth: 0,
					maxHeight: 0,
				};
			}
		},
		positionRestrictions() {
			if (this.initialized) {
				return this.positionRestrictionsAlgorithm({
					imageSize: this.imageSize,
					imageRestriction: this.imageRestriction,
					visibleArea: this.visibleArea,
				});
			} else {
				return {};
			}
		},
		// Styling
		classes() {
			return {
				cropper: classnames(cn(), this.classname),
				image: classnames(cn('image'), this.imageClass || this.imageClassname),
				area: classnames(cn('area'), this.areaClass || this.areaClassname),
				stretcher: classnames(cn('stretcher')),
				background: classnames(cn('background'), this.backgroundClass || this.backgroundClassname),
				imageWrapper: classnames(cn('image-wrapper')),
				cropperWrapper: classnames(cn('cropper-wrapper')),
			};
		},
		imageTransforms() {
			return {
				...this.basicImageTransforms,
				scaleX: this.basicImageTransforms.scaleX || 1,
				scaleY: this.basicImageTransforms.scaleY || 1,
				translateX: this.visibleArea ? this.visibleArea.left / this.coefficient : 0,
				translateY: this.visibleArea ? this.visibleArea.top / this.coefficient : 0,
			};
		},
		stencilCoordinates() {
			if (this.initialized) {
				const { width, height, left, top } = this.coordinates;
				return {
					width: width / this.coefficient,
					height: height / this.coefficient,
					left: (left - this.visibleArea.left) / this.coefficient,
					top: (top - this.visibleArea.top) / this.coefficient,
				};
			} else {
				return this.defaultCoordinates();
			}
		},
		wrapperStyle() {
			return {
				width: `${this.stencilCoordinates.width}px`,
				height: `${this.stencilCoordinates.height}px`,
				left: `${this.stencilCoordinates.left}px`,
				top: `${this.stencilCoordinates.top}px`,
			};
		},
	},
	watch: {
		src() {
			this.onChangeImage();
		},
		minWidth() {
			this.onPropsChange();
		},
		stencilComponent() {
			this.$nextTick(() => {
				this.resetCoordinates();
			});
		},
		maxWidth() {
			this.onPropsChange();
		},
		minHeight() {
			this.onPropsChange();
		},
		maxHeight() {
			this.onPropsChange();
		},
		imageRestriction() {
			this.reset();
		},
		stencilProps(oldProps, newProps) {
			const significantProps = ['aspectRatio', 'minAspectRatio', 'maxAspectRatio'];
			if (significantProps.find((prop) => oldProps[prop] !== newProps[prop])) {
				this.$nextTick(this.onPropsChange);
			}
		},
	},
	mounted() {
		this.debouncedUpdate = debounce(this.update, this.debounce);

		this.$refs.image.addEventListener('load', () => {
			this.onSuccessLoadImage();
		});
		this.$refs.image.addEventListener('error', () => {
			this.onFailLoadImage();
		});
		this.onChangeImage();

		// Add listeners to window to adapt the cropper to window changes
		window.addEventListener('resize', this.refresh);
		window.addEventListener('orientationchange', this.refresh);
	},
	destroyed() {
		window.removeEventListener('resize', this.refresh);
		window.removeEventListener('orientationchange', this.refresh);
	},
	methods: {
		// External methods
		getResult() {
			const coordinates = this.initialized
				? this.prepareResult({ ...this.coordinates })
				: this.defaultCoordinates();
			if (this.canvas && this.src && this.imageLoaded) {
				this.updateCanvas(this.coordinates);
				return {
					coordinates,
					visibleArea: this.visibleArea ? { ...this.visibleArea } : null,
					canvas: this.$refs.canvas,
				};
			} else {
				return {
					coordinates,
					visibleArea: this.visibleArea ? { ...this.visibleArea } : null,
				};
			}
		},
		zoom(factor, center) {
			this.onManipulateImage(
				new ManipulateImageEvent(
					{},
					{
						factor: 1 / factor,
						center,
					},
				),
			);
		},
		move(left, top) {
			this.onManipulateImage(
				// Multiplying on coefficient is temporary solution
				new ManipulateImageEvent({
					left: left * this.coefficient || 0,
					top: top * this.coefficient || 0,
				}),
			);
		},
		setCoordinates(transforms, params = {}) {
			const { autoZoom = true } = params;
			this.$nextTick(() => {
				if (!this.imageLoaded) {
					this.delayedTransforms = transforms;
				} else {
					this.applyTransform(transforms, autoZoom);
				}
			});
		},
		// Internal methods
		prepareResult(coordinates) {
			if (this.roundResult) {
				return algorithms.roundCoordinates({
					...this.getPublicProperties(),
					positionRestrictions: algorithms.limitBy(this.positionRestrictions, this.visibleArea),
					coordinates,
				});
			} else {
				return coordinates;
			}
		},
		autoZoom(coordinates) {
			const { visibleArea } = algorithms.autoZoom({
				...this.getPublicProperties(),
				coordinates,
			});

			this.visibleArea = visibleArea;
		},
		normalizeEvent(event) {
			return algorithms.normalizeEvent({
				...this.getPublicProperties(),
				event,
			});
		},
		updateCanvas(coordinates) {
			// This function can be asynchronously called because it's debounced
			// Therefore there is workaround to prevent processing after the component was unmounted
			if (!this.$refs.canvas) return;

			const image = this.$refs.image;
			const source = this.checkOrientation
				? prepareSource(this.$refs.sourceCanvas, image, this.imageTransforms)
				: image;

			const canvas = this.$refs.canvas;
			canvas.width = coordinates.width;
			canvas.height = coordinates.height;

			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(
				source,
				coordinates.left,
				coordinates.top,
				coordinates.width,
				coordinates.height,
				0,
				0,
				coordinates.width,
				coordinates.height,
			);
		},
		update() {
			this.$emit('change', this.getResult());
		},
		onChangeCoordinates(newCoordinates, debounce = true) {
			this.coordinates = newCoordinates;
			if (this.$listeners && this.$listeners.change) {
				if (debounce && this.debounce) {
					this.debouncedUpdate();
				} else {
					this.update();
				}
			}
		},
		onChangeImage() {
			this.imageLoaded = false;
			this.delayedTransforms = null;
			this.imageAttributes.src = null;

			if (this.src) {
				const promise = parseImage(this.src);
				if (isCrossOriginURL(this.src) && this.canvas) {
					this.imageAttributes.crossOrigin = this.crossOrigin;
				}
				setTimeout(() => {
					promise.then(this.onParseImage);
				}, this.transitionTime);
			} else {
				this.clearImage();
			}
		},
		onFailLoadImage() {
			this.clearImage();
			this.$emit('error');
		},
		onSuccessLoadImage() {
			// After loading image the current component can be unmounted
			// Therefore there is a workaround to prevent processing the following code
			const image = this.$refs.image;
			if (image && !this.imageLoaded) {
				if (this.imageTransforms.flipped) {
					this.imageSize.height = image.naturalWidth;
					this.imageSize.width = image.naturalHeight;
				} else {
					this.imageSize.height = image.naturalHeight;
					this.imageSize.width = image.naturalWidth;
				}
				this.imageLoaded = true;
				this.reset().then(() => {
					this.$emit('ready');
				});
			}
		},
		onParseImage({ source, arrayBuffer, orientation }) {
			if (arrayBuffer && orientation && isLocal(source)) {
				this.imageAttributes.src = arrayBufferToDataURL(arrayBuffer);
			} else {
				this.imageAttributes.src = source;
			}
			this.basicImageTransforms = getImageTransforms(orientation);
			this.$nextTick(() => {
				const image = this.$refs.image;
				if (image && image.complete) {
					if (isLoadedImage(image)) {
						this.onSuccessLoadImage();
					} else {
						this.onFailLoadImage();
					}
				}
			});
		},
		onMove(event) {
			this.onChangeCoordinates(
				this.moveAlgorithm({
					...this.getPublicProperties(),
					positionRestrictions: algorithms.limitBy(this.positionRestrictions, this.visibleArea),
					coordinates: this.coordinates,
					event: this.normalizeEvent(event),
				}),
			);
		},
		onResize(event) {
			const sizeRestrictions = this.sizeRestrictions;

			// The magic number is the approximation of the handler size
			// Temporary solution that should be improved in the future
			const minimumSize = Math.min(this.coordinates.width, this.coordinates.height, 20 * this.coefficient);

			this.onChangeCoordinates(
				this.resizeAlgorithm({
					...this.getPublicProperties(),
					positionRestrictions: algorithms.limitBy(this.positionRestrictions, this.visibleArea),
					sizeRestrictions: {
						...sizeRestrictions,
						minWidth: Math.max(sizeRestrictions.minWidth, minimumSize),
						minHeight: Math.max(sizeRestrictions.minHeight, minimumSize),
					},
					event: this.normalizeEvent(event),
				}),
			);
		},
		onManipulateImage(event) {
			const { visibleArea, coordinates } = algorithms.manipulateImage({
				...this.getPublicProperties(),
				event: this.normalizeEvent(event),
				imageRestriction: this.imageRestriction,
				settings: {
					resize: this.settings.resize.stencil,
				},
			});

			this.visibleArea = visibleArea;
			this.onChangeCoordinates(coordinates);
		},
		onPropsChange() {
			this.applyTransform(this.coordinates, true, true);
		},
		applyTransform(transform, autoZoom = false, limited = false) {
			const sizeRestrictions =
				this.visibleArea && limited
					? limitSizeRestrictions(this.sizeRestrictions, this.visibleArea)
					: this.sizeRestrictions;

			const positionRestrictions = this.visibleArea
				? limitBy(this.positionRestrictions, this.visibleArea)
				: this.positionRestrictions;

			const coordinates = algorithms.applyTransform({
				coordinates: this.coordinates,
				transform,
				sizeRestrictions,
				positionRestrictions,
				aspectRatio: this.getAspectRatio(),
				imageSize: this.imageSize,
			});

			if (autoZoom) {
				this.autoZoom(coordinates);
			}

			this.onChangeCoordinates(coordinates, false);

			return coordinates;
		},
		resetCoordinates() {
			// This function can be asynchronously called after completion of refreshing image promise
			// Therefore there is a workaround to prevent processing after the component was unmounted
			// Also coordinates can't be reset if visible area was not initialized
			if (!this.$refs.image) return;

			const cropper = this.$refs.cropper;
			const image = this.$refs.image;

			const { minWidth, minHeight, maxWidth, maxHeight } = this.sizeRestrictions;

			const defaultSize = isFunction(this.defaultSize)
				? this.defaultSize({
						boundaries: this.boundaries,
						imageSize: this.imageSize,
						aspectRatio: this.getAspectRatio(),
						sizeRestrictions: this.sizeRestrictions,
						visibleArea: this.visibleArea,
						// Deprecated params
						cropper,
						image,
						imageWidth: this.imageSize.width,
						imageHeight: this.imageSize.height,
						props: this.$props,
						...this.sizeRestrictions,
				  })
				: this.defaultSize;

			if (
				process.env.NODE_ENV === 'development' &&
				(defaultSize.width < minWidth ||
					defaultSize.height < minHeight ||
					defaultSize.width > maxWidth ||
					defaultSize.height > maxHeight)
			) {
				console.warn(
					'Warning: the default size breaks size restrictions. Check your defaultSize function',
					defaultSize,
					this.sizeRestrictions,
				);
			}

			const transforms = [
				defaultSize,
				(coordinates) => ({
					...(isFunction(this.defaultPosition)
						? this.defaultPosition({
								coordinates,
								imageSize: this.imageSize,
								visibleArea: this.visibleArea,
								// Deprecated params
								cropper,
								image,
								stencilWidth: coordinates.width,
								stencilHeight: coordinates.height,
								imageWidth: this.imageSize.width,
								imageHeight: this.imageSize.height,
								props: this.$props,
						  })
						: this.defaultPosition),
				}),
			];

			if (this.delayedTransforms) {
				transforms.push(
					...(Array.isArray(this.delayedTransforms) ? this.delayedTransforms : [this.delayedTransforms]),
				);
			}
			this.applyTransform(transforms, false, true);
			this.delayedTransforms = null;
		},
		clearImage() {
			this.imageLoaded = false;
			setTimeout(() => {
				const stretcher = this.$refs.stretcher;
				if (stretcher) {
					stretcher.style.height = 'auto';
					stretcher.style.width = 'auto';
				}
				this.coordinates = this.defaultCoordinates();
				this.boundaries = {
					width: 0,
					height: 0,
				};
			}, this.transitionTime);
		},
		updateBoundaries() {
			const stretcher = this.$refs.stretcher;
			const cropper = this.$refs.cropper;

			this.initStretcher({
				cropper,
				stretcher,
				imageSize: this.imageSize,
			});

			return this.$nextTick().then(() => {
				const params = {
					cropper,
					imageSize: this.imageSize,
				};

				if (isFunction(this.defaultBoundaries)) {
					this.boundaries = this.defaultBoundaries(params);
				} else if (this.defaultBoundaries === 'fill') {
					this.boundaries = fillBoundaries(params);
				} else {
					this.boundaries = fitBoundaries(params);
				}

				if (!this.boundaries.width || !this.boundaries.height) {
					throw new Error("It's impossible to fit the cropper in the current container");
				}
			});
		},
		resetVisibleArea() {
			return this.updateBoundaries()
				.then(() => {
					if (this.priority !== 'visibleArea') {
						this.visibleArea = undefined;
						this.resetCoordinates();
					}
					this.visibleArea = algorithms.refineVisibleArea({
						visibleArea: isFunction(this.defaultVisibleArea)
							? this.defaultVisibleArea({
									imageSize: this.imageSize,
									boundaries: this.boundaries,
									coordinates: this.priority !== 'visibleArea' ? this.coordinates : undefined,
									areaRestrictions: this.areaRestrictions,
							  })
							: this.defaultVisibleArea,
						boundaries: this.boundaries,
						areaRestrictions: this.areaRestrictions,
					});

					if (this.priority === 'visibleArea') {
						this.resetCoordinates();
					}
				})
				.catch(() => {
					this.visibleArea = null;
				});
		},
		updateVisibleArea() {
			return this.updateBoundaries()
				.then(() => {
					this.visibleArea = this.fitVisibleArea({
						imageSize: this.imageSize,
						boundaries: this.boundaries,
						visibleArea: this.visibleArea,
						coordinates: this.coordinates,
						areaRestrictions: this.areaRestrictions,
					});
					this.coordinates = this.fitCoordinates({
						visibleArea: this.visibleArea,
						coordinates: this.coordinates,
						aspectRatio: this.getAspectRatio(),
						positionRestrictions: this.positionRestrictions,
						sizeRestrictions: this.sizeRestrictions,
					});
				})
				.catch(() => {
					this.visibleArea = null;
				});
		},
		refresh() {
			const image = this.$refs.image;
			if (this.src && image) {
				if (this.initialized) {
					return this.updateVisibleArea();
				} else {
					return this.reset();
				}
			}
		},
		reset() {
			return this.resetVisibleArea();
		},
		getAspectRatio() {
			if (this.$refs.stencil.aspectRatios) {
				return this.$refs.stencil.aspectRatios();
			} else {
				return {
					minimum: this.stencilProps.aspectRatio || this.stencilProps.minAspectRatio,
					maximum: this.stencilProps.aspectRatio || this.stencilProps.maxAspectRatio,
				};
			}
		},
		getPublicProperties() {
			return {
				coefficient: this.coefficient,
				visibleArea: this.visibleArea,
				coordinates: this.coordinates,
				boundaries: this.boundaries,
				sizeRestrictions: this.sizeRestrictions,
				positionRestrictions: this.positionRestrictions,
				areaRestrictions: this.areaRestrictions,
				aspectRatio: this.getAspectRatio(),
				imageRestriction: this.imageRestriction,
			};
		},
		defaultCoordinates() {
			return { ...DEFAULT_COORDINATES };
		},
	},
};
</script>

<template>
	<div ref="cropper" :class="classes.cropper">
		<div :class="classes.background" :style="areaStyle" />
		<div ref="stretcher" :class="classes.stretcher" />

		<div ref="area" :class="classes.area" :style="areaStyle">
			<cropper-wrapper
				:class="classes.cropperWrapper"
				:wheel-resize="settings.wheelResize"
				:touch-resize="settings.touchResize"
				:touch-move="settings.touchMove"
				:mouse-move="settings.touchMove"
				@move="onManipulateImage"
				@resize="onManipulateImage"
			>
				<div :class="classes.imageWrapper">
					<img
						ref="image"
						:crossorigin="imageAttributes.crossOrigin"
						:src="imageAttributes.src"
						:class="classes.image"
						:style="imageStyle"
						@mousedown.prevent
					/>
				</div>
				<component
					:is="stencilComponent"
					ref="stencil"
					:img="{
						src: imageAttributes.src,
						size: imageSize,
						transforms: imageTransforms,
						coefficient: coefficient,
					}"
					:result-coordinates="coordinates"
					:stencil-coordinates="stencilCoordinates"
					v-bind="stencilProps"
					@resize="onResize"
					@move="onMove"
				/>
				<canvas v-if="canvas" ref="canvas" :style="{ display: 'none' }" />
				<canvas v-if="canvas" ref="sourceCanvas" :style="{ display: 'none' }" />
			</cropper-wrapper>
		</div>
	</div>
</template>

<style lang="scss">
.vue-advanced-cropper {
	text-align: center;
	position: relative;
	user-select: none;
	max-height: 100%;
	max-width: 100%;
	direction: ltr;

	&__stretcher {
		pointer-events: none;
		position: relative;
		max-width: 100%;
		max-height: 100%;
	}

	&__image {
		opacity: 0.5;
		user-select: none;
		position: absolute;
		transform-origin: center;
		// Workaround to prevent bugs at the websites with max-width
		// rule applied to img (Vuepress for example)
		max-width: unset !important;
	}
	&__area {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 50%;
	}
	&__background {
		position: absolute;
		background: black;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	&__cropper-wrapper {
		width: 100%;
		height: 100%;
	}
	&__image-wrapper {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
	}
	&__stencil-wrapper {
		position: absolute;
	}
}
</style>

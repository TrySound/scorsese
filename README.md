# Scorsese

> Cute parallax engine. [See demo.](https://trysound.github.io/scorsese)

## Usage

`.actor-element` will start moving since 0px to -150px when `.scene-element`
top will be in viewport until element bottom will be in viewport.

```js
scorsese([{
	scene: '.scene-element',
	cast: [{
		actor: '.actor-element',
		translateY: -150
	}]
});
```

## Smooth scroll

In some cases some browsers suck with it. But you can always use
[simple lib which should be only included on the page](https://github.com/galambalazs/smoothscroll-for-websites)

## API

### var inst = scorsese(config)

Process config and listen scroll.

#### scene config

- `scene` - selector of element which is used to calculate ratio when it's in viewport
- `cast` - array of animation definitions

#### cast config

- `actor` - selector of animated element
- `easing` - function to process ratio and change linear easing. Returning value is constrained in [0..1]

Animation starts with zero and ends with specified values.
You can also specify unit in string value like `-20`, `'20%'`, `'20px'` etc.

- `translateX` (px unit if number)
- `translateY` (px unit if number)
- `scale` (units will be skipped)
- `rotate` (deg unit if number)
- `opacity` (units will be skipped)

### inst.reinit()

Destroy and reinitialize instance with the same config.

### inst.update()

Request update position of all actors in viewport.

### inst.destroy()

Destroy instance and stop scroll listening.

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)

# ckeditor-autoplaceholder

This plugin will add an inline editable widget to insert placeholder that work with autocompletion.

You have to pass the available token list (the list of key that autocompletion will match) inside condig option like this:

```javascript
var tokenList = {
    'animals.cats.persian': {
        // ...
    },
    'animals.cats.korat': {
        // ...
    },
    'animals.cats.ragdoll': {
        // ...
    },
    'animals.cats.bengal': {
        // ...
    },
    'animals.dogs.corgi': {
        // ...
    },
    'animals.dogs.beagle': {
        // ...
    },
    'animals.dogs.collie': {
        // ...
    },
    'animals.birds.parrot': {
        // ...
    },
    'animals.birds.pigeon': {
        // ...
    }
};

CKEDITOR.replace( 'editor' , {
    extraPlugins: 'autoplaceholder',
    autoplaceholder: {
        tokenList: tokenList,
        defaultText: 'Type something'
    }
});

```

Like in the example, you can separate key values with dot to provide a guided suggestion on different steps.
In the example if you type inside the placeholder "anim" it will suggest just "animals". Then when you choose the "animals" option it will suggest "dogs, cats, and birds" and so on.

You can specify an optional the optional configuration property "defaultText" that will substitute the default value that will appear inside the widget.

[Add Placeholder plugin to CkEditor from the addon page](https://ckeditor.com/cke4/addon/autoplaceholder)

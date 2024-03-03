
## Spoiler

Using `spoiler` you can store a plain text spoiler

```spoiler

This text is hidden with a spoiler

```

## Markdown Blocks

Using `spoiler-markdown` you can include markdown in your spoiler that will be rendered. You cannot use a code block inside this though. 

```spoiler-markdown

## Markdown 

Markdown works within the code block. However, you cannot use nested code blocks

[github.com](https://github.com)
```


### Env variables

Store environment variables as table with `spoiler-env` parsed and evaluated by `dotenv` 

```spoiler-env

TEST=TEST

DOUBLE_LINE=`This is the first line
This is the second line`
```




<p>Чтоб wiredep работал для css файлов, в частности bootstrap.css надо в файле bower_components/bootstrap/bower.json изменить путь к css 
файлу</p>
```javascript
заменить "less/bootstrap.less" на "dist/css/bootstrap.css"
"main": [
    "dist/css/bootstrap.css",
    "dist/js/bootstrap.js"
  ]
  ```
<strong>Внимание!</strong>
не трогать папку bower_components там кастомизированный бутстрап

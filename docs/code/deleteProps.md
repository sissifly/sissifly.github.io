#### 清除对象中值为空的属性

方法一

```js
// 按照数据类型，分类处理，递归
function deleletProps (obj) {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            // 基本数据类型处理 undefined、null
            if (obj[key] === undefined || obj[key] === null) {
                delete obj[key]
            }
            // 复杂数据类型，数组(多维数组、数组嵌套对象)
            if (obj[key] instanceof Array) {
                obj[key].forEach((item)=>{
                    item = item instanceof Object ? deleletProps(item) : item
                })
            } else if (obj[key] instanceof Object) {
                obj[key] = deleletProps(obj[key])
            }
        }
    }
    return obj
}
```

方法二

```js
// 清除对象值为空的属性,返回新对象
function deleletProps (obj) {
    // 递归数组元素
    if (obj instanceof Array)
        return obj.map((it) => deleletProps(it))

    // 基本数据类型不处理
    if (typeof obj !== 'object')   
        return obj
    
    // 对象
    return Object.entries(obj) // 对象转二维数组
      .filter(([k, v]) => v!=null) // 处理undefined, null
      .map(([k, v]) => [k, deleletProps(v)]) // 递归属性值value
      .reduce((acc, [k, v]) => ({ [k]: v, ...acc}), {}) // 二维数组转对象
}
```

测试数据
```js
var man = {
    age: 40,
    name: '',
    smart: true,
    wife: Symbol(),
    home: null,
    work: undefined,
    income: ()=>{ return 100},
    children: {
        name: 'son',
        age: 10,
        school: undefined,
        work: null,
        interest: {
            idols: [{
                    idol1: undefined,
                    idol2: [1,2],
                    idol3: null
                }],
            study: null
        }
    }
}
// output
{
    children: { 
        interest: { 
            idols: [{ 
                idol2: [ 1, 2 ] 
            }] 
        }, 
        age: 10, 
        name: 'son' 
    },
    income: ()=>{ return 100},
    wife: Symbol(),
    smart: true,
    name: '',
    age: 40
}
```
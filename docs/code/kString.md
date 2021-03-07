#### K[string]

```
// k[string], k是整数, string一串字符串  
// '2[ab]' => 'abab'  
// '2[d2[abc]]' => 'dabcabcdabcabc'  
// '2[d2[m]p]' => 'dmmpdmmp'  
```

方法一
```js
function getString(str) {
    // 由内向外找到第一个需要迭代的字符串
    let left = str.lastIndexOf('[')
    let right = str.indexOf(']')
    let innerString = str.substring(left+1,right)

    // 找到字符串之前的数字
    let count = 0, num = '';
    for (let i = left-1; i >= 0; i--) {
        if(/[0-9]/.test(str[i])){
            num = '' + str[i] + num
            count++
        } else {
            break
        }
    }
    // k 乘以字符串, 合成新的字符串
    let newString = innerString
    for (let i = 1; i < Number(num); i++) {
        newString += innerString
    }

    // 合成后的字符串，替换原k[string]
    let result = ''
    result = str.substring(0,left-count) + newString + str.substring(right).replace(/]/,'')
   
    // 若不存在[结束,否则递归
    return result.indexOf('[') === -1 ? result : getString(result)
}
```

方法二
```js
function getString2(kstr) {
    // 匹配 (前缀)(数字)[(内层字符串)](后缀)
    const regResult = /(.*?)(\d+)\[(.+)\](.*)/.exec(kstr)
    return regResult == null  
        ? kstr // 匹配不到结束递归
        : regResult[1] // 前缀
            + Array(Number(regResult[2]))
                .fill(0)
                .map(() => getString2(regResult[3]))
                .join('')
            + regResult[4] // 后缀
}
```

测试数据
```js
输入: 2[M2[AbC]]
输出: MAbCAbCMAbCAbC
输入: 2[CJ]
输出: CJCJ
输入: 2[A3[B]C]
输出: ABBBCABBBC
输入: 2[2[A3[B]CK]]
输出: ABBBCKABBBCKABBBCKABBBCK
```
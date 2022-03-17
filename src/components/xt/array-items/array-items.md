# 必要基础之 array-base / array-items

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]()

涉及包：

- @formily/react 
- @formily/core 
- @formily/json-schema
- react-sortable-hoc

# @formily/react

## Components

**ExpressionScope**

用于自定义组件内部给 json-schema 表达式传递局部作用域

```
const Container = (props) => {
  return (
    <ExpressionScope value={{ $innerScope: 'this inner scope value' }}>
      {props.children}
    </ExpressionScope>
  )
}
```

**RecursionField**

查看[API](http://localhost:8001/zh-CN/api/components/recursion-field)

自定义组件中使用，用于实现具有递归渲染能力的自定义组件

```
<RecursionField schema={schema.items} name={index} />
```

**Schema**

查看[API](http://localhost:8001/zh-CN/api/shared/schema)

通用 Class
也可以从 @formily/json-schema 包中单独导出

- 解析 json-schema 的能力
- 将 json-schema 转换成 Field Model 的能力
- 编译 json-schema 表达式的能力

## hooks

**useField**

查看[API](http://localhost:8001/zh-CN/api/hooks/use-field)

在自定义组件内读取当前字段属性，操作字段状态等

```
const FormItem = observer(({ children }) => {
  const field = useField()
  return (
    <Form.Item
      label={field.title}
      help={field.selfErrors?.length ? field.selfErrors : undefined}
      extra={field.description}
      validateStatus={field.validateStatus}
    >
      {children}
    </Form.Item>
  )
})
```

**useFieldSchema**

查看[API](http://localhost:8001/zh-CN/api/hooks/use-field-schema)

读取当前字段的 Schema 信息

```
const Custom = () => {
  const schema = useFieldSchema()
  return (
    <code>
      <pre>{JSON.stringify(schema.toJSON(), null, 2)}</pre>
    </code>
  )
}
```

## Shared

**observer**

查看[API](http://localhost:8001/zh-CN/api/shared/observer)

```
observer(() => {
  return (
    <div>
      <div>
        <input
          style={{
            height: 28,
            padding: '0 8px',
            border: '2px solid #888',
            borderRadius: 3,
          }}
          value={obs.value}
          onChange={(e) => {
            obs.value = e.target.value
          }}
        />
      </div>
      <div>{obs.value}</div>
    </div>
  )
})
```

## react-sortable-hoc

查看[git项目](https://github.com/clauderic/react-sortable-hoc)

**SortableContainer HOC**

| Property      | Type    | Default | Description                                              |
|---------------|---------|---------|----------------------------------------------------------|
| useDragHandle | Boolean | false   | If you're using the SortableHandle HOC, set this to true |

**SortableElement HOC**

Property	Type	Default	Required?	Description

| Property      | Type    | Default | Required? | Description                                              |
|---------------|---------|---------|-----------|----------------------------------------------------------|
| index | Number | |     ✓     | This is the element's sortableIndex within it's collection. This prop is required. |
| disabled | Boolean | false | | Whether the element should be sortable or not |

# @formily/core

## Modals

**ArrayField**

查看[API](http://localhost:8002/zh-CN/api/models/array-field)

ArrayField 是继承至 Field 模型的，所以大部分 API 参考 Field 模型即可



                                                       
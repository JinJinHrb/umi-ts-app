import React, { ChangeEvent, SyntheticEvent } from 'react';
import { Input as AntdInput, Select as AntdSelect, Divider as AntdDivider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LabeledValue } from 'antd/lib/select/index.d';
import _ from 'lodash';
import { umiConsole } from '@/utils';
import styles from './style.less';
const { Option: AntdOption } = AntdSelect;

interface IProps {
  value: string[];
  suffixIcon?: string;
  onChange: (data: any) => void;
  options: LabeledValue | LabeledValue[];
  loading?: boolean;
  title?: string;
  upperTitle?: string;
  inputType?: string;
  required?: boolean;
}

interface IState {
  value: string[];
  options: LabeledValue[];
  name: string;
}

interface IMyComponent {
  onChange: (data: any) => void;
  value: string[];
}

class MyComponent<IMyComponent> extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: [],
      options: [],
      name: '',
    };
  }

  onChange(newData: IState) {
    const value = newData?.value;
    // umiConsole.log('onChange #53 value:', value);
    if (!_.isEmpty(value)) {
      this.props?.onChange(value);
    } else {
      this.props?.onChange(undefined);
    }
  }

  onAntdSelectChange(value: string[], option: LabeledValue | LabeledValue[]) {
    umiConsole.log('onAntdSelectChange #60 value:', value);
    const newState = {} as any;
    newState.value = value;
    this.setState(newState, () => this.onChange(newState));
  }

  /*  onAntdInputChange(event: SyntheticEvent) {
    const value = (event.target as any)?.value;
    // umiConsole.log('onAntdInputChange #61 value:', value);
    const newState = { ...this.state };
    newState.value = { ...this.state.value };
    newState.value.entered = value;
    this.setState(newState, () => this.onChange(newState));
  } */

  onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = _.trim(event.target.value);
    this.setState({
      name,
    });
  };

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const options = nextProps.options || [];
    const polyfillOptions = _.isArray(options) ? options : [options];
    const nextState = {} as any;
    // if (!_.isEqual(polyfillOptions, prevState.options)) {
    if (!prevState.options) {
      nextState.options = polyfillOptions;
    }
    const nextStateValue = {};
    const propsValue = nextProps.value || {};
    const stateValue = prevState.value || {};
    Object.keys(stateValue).forEach((k) => {
      const stateVal = (stateValue as any)?.[k];
      const propsVal = (propsValue as any)?.[k];
      if (stateVal && !propsVal) {
        (nextStateValue as any)[k] = stateVal;
      } else if (propsVal && !stateVal) {
        if (stateVal === undefined) {
          (nextStateValue as any)[k] = propsVal;
        } else {
          // 场景：全选 input 删除后，stateVal === ''
          (nextStateValue as any)[k] = stateVal;
        }
      } else {
        (nextStateValue as any)[k] = propsVal;
      }
    });
    if (!_.isEmpty(nextStateValue)) {
      nextState.value = nextStateValue;
    }
    if (_.isEmpty(nextState)) {
      return null;
    }
    // umiConsole.log('getDerivedStateFromProps #84 nextState:', nextState);
    return nextState;
  }

  addItem = () => {
    const { options, name } = this.state;
    umiConsole.log('addItem #127 name:', name);
    // 有 label 或 value 重复的记录
    const duplicates = options.filter((el) => el.label === name || el.value === name);
    if (!_.isEmpty(duplicates)) {
      return;
    }
    const newOptions = [...options];
    newOptions.push({ label: name, value: name });
    this.setState({
      options: newOptions,
      name: '',
    });
  };

  render() {
    const {
      suffixIcon,
      onChange,
      value: propsValue,
      options: propsState,
      loading,
      title,
      upperTitle,
      inputType,
      required,
      ...props
    } = this.props;
    const { options, value, name } = this.state;
    return (
      <div {...props}>
        {upperTitle && !title && (
          <div style={{ width: '100%' }}>
            <div className="ant-formily-item-label ant-formily-item-item-col-5">
              <div className="ant-formily-item-label-content">
                <span className="ant-formily-item-asterisk">*</span>
                <label>{upperTitle}</label>
              </div>
              <span className="ant-formily-item-colon">:</span>
            </div>
          </div>
        )}
        <div className={styles.wrapper}>
          {/* <div className={styles.selectClass}>
            <AntdSelect
              suffixIcon={suffixIcon}
              onChange={this.onAntdSelectChange.bind(this)}
              options={options}
              value={value.selected}
            />
          </div>
          <div className={styles.inputClass}>
            <AntdInput onChange={this.onAntdInputChange.bind(this)} value={value.entered} type={inputType} />
          </div> */}
          <AntdSelect
            style={{ width: 240 }}
            placeholder="custom dropdown render"
            onChange={this.onAntdSelectChange.bind(this)}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <AntdDivider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                  <AntdInput style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                  <a
                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                    onClick={this.addItem}
                  >
                    <PlusOutlined /> Add item
                  </a>
                </div>
              </div>
            )}
            mode="multiple"
          >
            {options.map((item) => {
              const { value, label } = item;
              return <AntdOption key={value}>{label}</AntdOption>;
            })}
          </AntdSelect>
        </div>
      </div>
    );
  }
}
export default MyComponent;

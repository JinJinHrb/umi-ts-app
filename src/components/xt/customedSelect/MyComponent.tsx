import React, { ChangeEvent, SyntheticEvent } from 'react';
import {
  Input as AntdInput,
  Select as AntdSelect,
  Divider as AntdDivider,
  Button as AntdButton,
  Popover as AntdPopover,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LabeledValue } from 'antd/lib/select/index.d';
import _ from 'lodash';
import { umiConsole } from '@/utils';
const { Option: AntdOption } = AntdSelect;
import styles from './style.less';
import './inlineStyle.less';

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
  placeholder?: string;
}

interface IState {
  value: string[];
  options: LabeledValue[];
  name: string;
  open?: boolean; // 下拉框
}

interface IMyComponent {
  onChange: (data: any) => void;
  value: string[];
}

type TPartialState = Partial<IState>;

class MyComponent<IMyComponent> extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: [],
      options: [],
      name: '',
    };
  }

  onChange(newData: TPartialState) {
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
    const propsValue = nextProps.value || [];
    const stateValue = prevState.value || [];
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
    const { options } = this.state;
    const name = _.trim(this.state.name);
    const trimmedName = _.trim(name);
    umiConsole.log('addItem #127 trimmedName:', trimmedName);
    // if (!name) {
    //   return;
    // }
    // 有 label 或 value 重复的记录
    const duplicates = options.filter((el) => el.label === trimmedName || el.value === trimmedName);
    if (!_.isEmpty(duplicates)) {
      return;
    }
    const newState = { name: '' } as any;

    if (trimmedName) {
      const newOptions = [...options];
      newOptions.push({ label: trimmedName, value: trimmedName });
      newState.options = newOptions;
    }
    this.setState(newState);
  };

  deleteHandler = (value: LabeledValue['value']) => {
    if (!value) {
      return;
    }
    const options = (this.state?.options || []).filter((a) => a.value !== value);
    const stateValue = Object.values(this.state?.value || []).filter((a) => a !== value);
    this.setState({ options, value: stateValue }, () => this.onChange({ value: stateValue }));
  };

  /**
   * @param visible
   * true 保持上一级模态框打开状态
   */
  handleClickChange = (visible: boolean) => {
    umiConsole.log('xt/customedSelect #160 visible:', visible);
    if (visible) {
      this.setState({ open: true });
    } else {
      this.setState({ open: undefined });
    }
  };

  /**
   * 选择颜色
   */
  pickColorHandler = (e: any) => {
    const target = e.target;
    umiConsole.log('pickColorHandler #167 target:', target);
    const color = target?.getAttribute('color');
    alert(color);
  };

  content = (
    <div className={styles.colorPalette} onClick={this.pickColorHandler}>
      <div color="#fa541c" style={{ background: 'rgb(250, 84, 28)' }}></div>
      <div color="#fa8c16" style={{ background: 'rgb(250, 140, 22)' }}></div>
      <div color="#fadb14" style={{ background: 'rgb(250, 219, 20)' }}></div>
      <div color="#52c41a" style={{ background: 'rgb(82, 196, 26)' }}></div>
      <div color="#2f54eb" style={{ background: 'rgb(47, 84, 235)' }}></div>
      <div color="#eb2f96" style={{ background: 'rgb(235, 47, 150)' }}></div>
    </div>
  );

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
      placeholder,
      ...props
    } = this.props;
    const { options, /* value, */ name, open } = this.state;
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
            placeholder={placeholder}
            onChange={this.onAntdSelectChange.bind(this)}
            dropdownRender={(menu) => (
              <div className={'xt-dropdownWrapper'}>
                {menu}
                <AntdDivider className={styles.dropdownDivider} />
                <div className={styles.dropdownExtension}>
                  <AntdInput className={styles.inputItem} value={name} onChange={this.onNameChange} />
                  <AntdPopover
                    placement="topRight"
                    title={'选颜色'}
                    content={this.content}
                    trigger="click"
                    zIndex={1051}
                    onVisibleChange={this.handleClickChange}
                  >
                    <AntdButton size={'small'} className={styles.colorPaletteButton}>
                      TR
                    </AntdButton>
                  </AntdPopover>
                  <a className={styles.addItemButton} onClick={this.addItem}>
                    <PlusOutlined /> 添加
                  </a>
                </div>
              </div>
            )}
            mode="multiple"
            optionLabelProp="label"
            open={open}
          >
            {options.map((item) => {
              const { value, label } = item;
              //   return <AntdOption key={value}>{label}</AntdOption>;
              return (
                <AntdOption key={value}>
                  <div className={styles.optionItem}>
                    <span className={styles.optionLabelItem}>{label}</span>
                    <AntdButton
                      size={'small'}
                      onClick={(e) => {
                        const selectedValues = Object.values(this.state?.value || []).filter((a) => a === value) || [];
                        // umiConsole.log('xt/customedSelect #213 selectedValues:', selectedValues);
                        if (selectedValues.length < 1) {
                          e.stopPropagation();
                        }
                        this.deleteHandler(value);
                      }}
                    >
                      delete
                    </AntdButton>
                  </div>
                </AntdOption>
              );
            })}
          </AntdSelect>
        </div>
      </div>
    );
  }
}
export default MyComponent;

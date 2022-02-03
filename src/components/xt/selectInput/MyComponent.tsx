import React, { SyntheticEvent } from 'react';
import { Input as AntdInput, Select as AntdSelect } from 'antd';
import { LabeledValue } from 'antd/lib/select/index.d';
import _ from 'lodash';
import styles from './style.less';
import { umiConsole } from '@/utils';

interface IProps {
  value: {
    media: string;
    account: string;
  };
  suffixIcon?: string;
  onChange: (data: any) => void;
  options: LabeledValue | LabeledValue[];
  loading: boolean;
  title: string;
  upperTitle: string;
}

interface IState {
  value: {
    media: string;
    account: string;
  };
  options: LabeledValue[];
}

interface IMyComponent {
  onChange: (data: any) => void;
  value: {
    media: string;
    account: string;
  };
}

class MyComponent<IMyComponent> extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: {
        media: '',
        account: '',
      },
      options: [],
    };
  }

  onChange(newData: IState) {
    // umiConsole.log('onChange #49 newData?.value:', newData?.value);
    this.props?.onChange(newData?.value);
  }

  onAntdSelectChange(value: string, option: LabeledValue | LabeledValue[]) {
    // umiConsole.log('onAntdSelectChange #53 value:', value, 'option:', option);
    const newState = { ...this.state };
    newState.value = { ...this.state.value };
    newState.value.media = value;
    this.setState(newState, () => this.onChange(newState));
  }

  onAntdInputChange(event: SyntheticEvent) {
    const value = (event.target as any)?.value;
    // umiConsole.log('onAntdInputChange #61 value:', value);
    const newState = { ...this.state };
    newState.value = { ...this.state.value };
    newState.value.account = value;
    this.setState(newState, () => this.onChange(newState));
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const options = nextProps.options || [];
    const polyfillOptions = _.isArray(options) ? options : [options];
    const nextState = {} as any;
    if (!_.isEqual(polyfillOptions, prevState.options)) {
      nextState.options = polyfillOptions;
    }
    const propsValue = nextProps.value;
    const stateValue = prevState.value;
    if (propsValue && !_.isEqual(propsValue, stateValue)) {
      nextState.value = propsValue;
    }
    if (_.isEmpty(nextState)) {
      return null;
    }
    // umiConsole.log('getDerivedStateFromProps #84 nextState:', nextState);
    return nextState;
  }

  render() {
    const {
      suffixIcon,
      onChange,
      value: propsValue,
      options: propsState,
      loading,
      title,
      upperTitle,
      ...props
    } = this.props;
    const { options, value } = this.state;
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
          <div className={styles.selectClass}>
            <AntdSelect
              suffixIcon={suffixIcon}
              onChange={this.onAntdSelectChange.bind(this)}
              options={options}
              value={value.media}
            />
          </div>
          <div className={styles.inputClass}>
            <AntdInput onChange={this.onAntdInputChange.bind(this)} value={value.account} />
          </div>
        </div>
      </div>
    );
  }
}
export default MyComponent;

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Link from '../Link';

describe('测试 Link 模块', () => {
  it('Link 组件 - 空属性', () => {
    const { container } = render(<Link />);

    const link = container.querySelector('a');
    expect(link?.textContent).toBe('');
    expect(link?.href).toBe('http://localhost/#');
    expect(link?.className).toBe('normal');
  });
  it('Link 组件 - 非空属性', () => {
    const siteUrl = 'http://example.com/';
    const text = 'Visit';
    const { container } = render(<Link page={siteUrl} children={text} />);
    const link = container.querySelector('a');
    expect(link?.textContent).toBe(text);
    expect(link?.href).toBe(siteUrl);
    expect(link?.className).toBe('normal');
    link && userEvent.hover(link);
    expect(link?.className).toBe('hovered');
    link && userEvent.unhover(link);
    expect(link?.className).toBe('normal');
  });
});
describe('测试 Link 模块/snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

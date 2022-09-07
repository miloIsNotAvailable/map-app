import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '../../components/assets/Icon';
import { default as Example } from '../../graphics/icons/home.svg'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Assets/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    iconPath: Example,
    placeholder: "home"
}

// export const Placeholder = {
//   args: {
//     placeholder: "login"
//   }
// }

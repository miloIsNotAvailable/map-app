import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Fallback from '../../components/assets/Fallback';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Assets/Fallback',
  component: Fallback,
} as ComponentMeta<typeof Fallback>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Fallback> = (args) => <Fallback {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    width: "clamp(45ch, 50%, 75ch)",
    height: 'var(--font-size)'
}

// export const Placeholder = {
//   args: {
//     placeholder: "login"
//   }
// }

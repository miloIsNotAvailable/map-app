import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Form from '../../components/assets/Form/Form';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Assets/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  placeholder: "login"
}

export const Placeholder = {
  args: {
    placeholder: "login"
  }
}

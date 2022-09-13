import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PostNavbar from '../../components/assets/SubmitNavbar/PostNavbar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Assets/PostNavbar',
  component: PostNavbar,
} as ComponentMeta<typeof PostNavbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PostNavbar> = (args) => <PostNavbar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    isLoading: true,
}

// export const Placeholder = {
//   args: {
//     placeholder: "login"
//   }
// }

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import PostNavbar from '../../components/assets/SubmitNavbar/PostNavbar';
import Post from '../../components/assets/Post';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Assets/Post',
  component: Post,
} as ComponentMeta<typeof Post>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Post> = (args) => <Provider store={ store }><Post {...args} /></Provider>;

export const Primary = Template.bind({});

Primary.args = {}

// export const Placeholder = {
//   args: {
//     placeholder: "login"
//   }
// }

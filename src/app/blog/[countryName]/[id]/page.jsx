import React from 'react'
import BlogPageTwo from './BlogPageTwo'

function page({params}) {
const {id} = params;
  return (
    <div>
      <BlogPageTwo id={id} />
    </div>
  );
}

export default page
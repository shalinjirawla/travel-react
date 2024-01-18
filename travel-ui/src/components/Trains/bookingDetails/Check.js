import React from 'react'
import { Checkbox } from 'antd';

const Check = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <>
      <div className='check1' style={{paddingBottom: '4%'}}>
        <Checkbox className='checkk' onChange={onChange}><span className='checkbox-1'>Do you want to take Travel Insurance (₹0.35/person)?</span></Checkbox><br />
        <Checkbox className='checkk' onChange={onChange}><span className='checkbox-1'>I have a GSTIN Number</span></Checkbox>
        </div>
    </>
  )
}
  
export default Check
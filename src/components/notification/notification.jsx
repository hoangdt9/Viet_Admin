import React, { forwardRef, useImperativeHandle } from 'react';
import { notification } from 'antd';

const Notification = forwardRef((props, ref) => {

  const [api, contextHolder] = notification.useNotification();

  useImperativeHandle(ref, () => ({
    
    openNotificationWithIcon ({type, title, description}) {
        api[type]({
          message: title,
          description: description, 
        });
      }
  }));

  return (
    <>
      {contextHolder}
    </>
  );
});
export default Notification;
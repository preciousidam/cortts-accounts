import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { notification } from 'antd';


export const openNotification = (title,msg, status='error') => {
    notification.open({
      message: title,
      description: msg,
      icon: status == 'success' ? <CheckCircleOutlined style={{ color: '#00ff00' }} /> : <CloseCircleOutlined style={{ color: '#ff0000' }} />,
    });
};

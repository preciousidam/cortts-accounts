import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { notification } from 'antd';


export const openNotification = (status,msg) => {
    notification.open({
      message: status,
      description: msg,
      icon: status == 'success' ? <CheckCircleOutlined style={{ color: '#00ff00' }} /> : <CloseCircleOutlined style={{ color: '#ff0000' }} />,
    });
};

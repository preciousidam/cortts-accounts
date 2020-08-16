import {Spin} from 'antd';

export default function Loader(){
    return(
        <div id="centered-div">
            <Spin size='large' />
            <style jsx>
                {
                    `
                        #centered-div{
                            width: 100%;
                            height: calc(100% - 70px);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                    `
                }
            </style>
        </div>
    )
}
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { DatePicker, Checkbox } from 'antd';


import {StyledInput, SelectInput} from '../textinput/styledTextInput';

const options = [{text: "Olympic Tower", value: 'olympic'},{text: "Crestview Tower", value: 'crestview'},{text: "Visage Apartments", value: 'visage'},]
const areas = [{text: "Ikoyi", value: 'ikoyi'},{text: "Victoria Island", value: 'vi'},{text: "Ajah", value: 'Ajah'},{text: "Lekki", value: 'lekki'},]



export  function Form({close, details={}, showSaveBtn}){

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
      
    const onOk = (value) => {
        console.log('onOk: ', value);
    }

    const { RangePicker } = DatePicker;

    return (
        <Paper id="edit-form" className="container">
            <header>
                <h5>Flat {details.flat} | Edit Details</h5>
                <IconButton onClick={e => close()}><CloseOutlined /></IconButton>
            </header>
            <div id="form" className="row">
                <div className="col-6">
                    <StyledInput type="text" placeholder="AM6" label="Flat" id="flat" />
                </div>
                <div className="col-6">
                    <SelectInput options={options} id="property" defaultChoice="Select property" label="Property" />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Bedroom" id="bed" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Baths" id="baths" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Toilet" id="toilet" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Car Park" id="park" min={1} max={10} />
                </div>
                <div className="col-9">
                    <StyledInput type="text" placeholder="Block 101, Plot 7, Furo Ezimora" label="Address" id="address" />
                </div>
                <div className="col-3">
                    <SelectInput options={areas} id="area" defaultChoice="Select area" label="Area" />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <StyledInput type="number" label="Rent" id="rent" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-4">
                    <StyledInput type="number" label="Service Charge" id="sc" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-4">
                    <label htmlFor="date">Tenancy Period</label>
                    <RangePicker
                        className="date"
                        format="DD-MM-YYYY"
                        onChange={onChange}
                        onOk={onOk}
                        id="date"
                    />
                </div>
                <div className="col-12">
                    <Checkbox>Furnished</Checkbox>
                    <Checkbox>Occupied</Checkbox>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <SelectInput options={options} id="landlord" defaultChoice="Select landlord" label="Landlord" />
                </div>
                <div className="col-6">
                    <SelectInput options={options} id="tenant" defaultChoice="Select tenant" label="Tenant" />
                </div>

                <div className="col-12">
                    <label htmlFor="note">Additiona Note?</label>
                    <textarea class="form-control" id="note" rows="3"></textarea>
                </div>
            </div>
            {showSaveBtn && <div>
                <button className="btn btn-success">Save</button>
            </div>}
        </Paper>
    );
}


export default function CreateForm({close}){

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
      
    const onOk = (value) => {
        console.log('onOk: ', value);
    }

    const { RangePicker } = DatePicker;

    return (
        <div id="edit-form" className="container">
            <div id="form" className="row">
                <div className="col-6">
                    <StyledInput type="text" placeholder="AM6" label="Flat" id="flat" />
                </div>
                <div className="col-6">
                    <SelectInput options={options} id="property" defaultChoice="Select property" label="Property" />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Bedroom" id="bed" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Baths" id="baths" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Toilet" id="toilet" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput type="number" label="Car Park" id="park" min={1} max={10} />
                </div>
                <div className="col-9">
                    <StyledInput type="text" placeholder="Block 101, Plot 7, Furo Ezimora" label="Address" id="address" />
                </div>
                <div className="col-3">
                    <SelectInput options={areas} id="area" defaultChoice="Select area" label="Area" />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <StyledInput type="number" label="Rent" id="rent" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-4">
                    <StyledInput type="number" label="Service Charge" id="sc" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-4">
                    <label htmlFor="date">Tenancy Period</label>
                    <RangePicker
                        className="date"
                        format="DD-MM-YYYY"
                        onChange={onChange}
                        onOk={onOk}
                        id="date"
                    />
                </div>
                <div className="col-12">
                    <Checkbox>Furnished</Checkbox>
                    <Checkbox>Occupied</Checkbox>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <SelectInput options={options} id="landlord" defaultChoice="Select landlord" label="Landlord" />
                </div>
                <div className="col-6">
                    <SelectInput options={options} id="tenant" defaultChoice="Select tenant" label="Tenant" />
                </div>

                <div className="col-12">
                    <label htmlFor="note">Additiona Note?</label>
                    <textarea class="form-control" id="note" rows="3"></textarea>
                </div>
            </div>
            <div>
                <button className="btn btn-success">Save</button>
            </div>
        </div>
    );
}
import React from 'react';

const FormField = ({formData,change,id}) => {
    
    //Hàm trả về lỗi nằm trong thẻ <div></div> 
    const showError = () => {
        let errorMesssage = null;

        if(formData.validation && !formData.valid)
        {
            errorMesssage = (
                <div className="error_label" style={{color: 'red',textTransform: 'capitalize'}}>
                {formData.validationMessage}
                </div>
            )
        }
        return errorMesssage;
    }

    const renderTemplate = () => {
        let formTemplate =null;
        switch(formData.element){
            case ('input'):
                formTemplate = (
                    <div className="formBlock" >
                        {  formData.showlabel?
                            <div className="label_input">{formData.config.label}</div>
                            :null
                        }
                        <input {...formData.config}
                            value={formData.value}
                            //sự kiện onBlur được dùng để validate required
                            onBlur={(event) => change({event,id,blur:true})}
                            //sự kiện change được dùng để validate email/password có pass đc Regex không
                            onChange={(event) => change({ event, id, blur: true })}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('password'):
                formTemplate = (
                    <div className="formBlock" >
                        <input {...formData.config}
                            value={formData.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id, blur: true })}
                        />
                        {showError()}
                    </div>
                    
                )
                break;
            case('select'):
                formTemplate = (
                    <div className="formBlock" >
                        {  formData.showlabel ?
                            <div className="label_input">{formData.config.label}</div>
                            : null
                        }

                        <select
                            value={formData.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        >
                            <option value="">Select one</option>
                            {
                                formData.config.options.map(item => (
                                    <option 
                                    key={item.key}
                                    value={item.key}>
                                    {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break;
            case ('textarea'):
                formTemplate = (
                    <div className="formBlock" >
                        {  formData.showlabel ?
                            <div className="label_input">{formData.config.label}</div>
                            : null
                        }
                        <textarea {...formData.config}
                            value={formData.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </div>
                )
                break;

            default:
                formTemplate = null;

        }
        return formTemplate;
    }   
    return (
        <div class="formField_container">
            {renderTemplate()}
        </div>
    );
};

export default FormField;
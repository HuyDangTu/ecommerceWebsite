export const generateData = (formdata, formName) =>{
    
    let dataToSubmit = {};
    for (let key in formdata){
        if(key !== 'confirmPassword')
        {
            dataToSubmit[key] = formdata[key].value;
        }
        //dataToSubmit[key] = formdata[key].value;
    }
    return dataToSubmit;
}

export const ifFormValid = (formdata,formName) =>{
    let formValid = true;

    for (let key in formdata)
    {
        formValid = formdata[key].valid && formValid;
    }

    return formValid;
}

//Nhận vào element và formdata(từ State của login truyền thông qua hàm update)
export const validate = (element,formdata=[]) =>{
    let error = [true,''];

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${ valid ?'':'Password do not match'}`;
        error = !valid ? [valid, message] : error;
    }


    // Nếu giá trị email trong Validation = true thì kiểm tra value vs regex     
    if (element.validation.email){
        const valid = /(.+)@(.+){2,}\.(.+){2,}/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    // Nếu giá trị required trong Validation = true thì kiểm tra value có rổng hay không  
    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'this field is required' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    return error;
}

export const update = (element, formdata, formName) =>{

    //element gồm: event(event.target để lấy ra data ng dùng nhập trong field đi validate),
    //             Id(để xác định là field nào),
    //             blur( luôn luôn bằng true) 

    //copy formdata(formdata từ state của component login) ra một newFormData để cập nhật lại các giá trị 
    const newFormdata = {...formdata};

    //Lấy ra formData của đối tượng có Id bằng với element.Id truyền vào 
    const newElement = {
        ...newFormdata[element.id]
    }
    
   
    //Lấy value của field từ element.event.target.value
    newElement.value = element.event.target.value;

  
    if(element.blur){
        //Kiểm tra value đc nhập vào field có hợp lệ không bằng hàm validate
        let validData = validate(newElement,formdata);
        //Cập nhật lại valid và validationMessage trong newElement
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    //Thêm newElement vào State newFormdata
    newFormdata[element.id] = newElement;
    
    return newFormdata;
};

export const populateOptionFields= (formData,arrayData =[], field) => {
    const newArray = []
    const newFormData = {...formData};

    arrayData.forEach(item=>{
        newArray.push({key:item._id,value:item.name});
    })

    newFormData[field].config.options = newArray;
    return newFormData;

}

export const resetFields = (formData,formName) => {
    const newFormData = {...formData};

    for(let key in newFormData){
        if(key ==='images'){
            newFormData[key].value = [];
        }else{
            newFormData[key].value = '';
        }

        newFormData[key].valid = '';
        newFormData[key].touched = '';
        newFormData[key].validationMessage = '';
    }    

    return newFormData;
}



export const populateFields = (formData,fields) =>{

    for(let key in formData){
        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = '';
    }
   
    return formData;

}
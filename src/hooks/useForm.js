import { useState } from 'react';

const useForm = (initialForm) => {

    const [values, setValues] = useState(initialForm);
    const handleInputChange = ({ target }) => {   
        if(target.name !== '')
        {
            setValues({
                ...values,
                [target.name]: target.value
            });
        }
    };

    const handleBlur = (e) => {
        handleInputChange(e);
    }

    return {
        values,
        handleInputChange,
        handleBlur
    }
}

export default useForm;
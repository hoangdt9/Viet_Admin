import { useState } from "react";
import Select from "react-tailwindcss-select";

const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" }
];

const CustomSelect = () => {
    const [animal, setAnimal] = useState(null);
    
    const handleChange = (value) => {
        console.log("value:", value);
        setAnimal(value);
    };
    
    return (
        <Select
            value={"animal"}
            onChange={handleChange}
            options={options}
        />
    );
};


export default CustomSelect;
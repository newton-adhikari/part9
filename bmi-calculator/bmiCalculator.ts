interface BodyFeatures {
    height: number,
    weight: number
}

const parseArguments = (params: string[]) : BodyFeatures => {
    if(!params[2] || !params[3])
        throw new Error("height or weight is missing: usage npm run CalculateBmi <height> <weight>");

    if (isNaN(Number(params[2])) || isNaN(Number(params[3])))
        throw new Error("height and weight must be number");

    return {
        height: Number(params[2]),
        weight: Number(params[3])
    }
}

export const calculateBmi = (height: number, weight: number) : string => {
    height = height / 100;
    const bmi = weight / (height * height);
    console.log(bmi);
    const desc = bmi < 18.5 
        ? "Underweight"
        : bmi > 18.5 && bmi < 25 
            ? "Normal (healthy weight)"
            : "Overweight"
    ;
    return desc;
}

try {
    const { height, weight } = parseArguments(process.argv);

    console.log(calculateBmi(height, weight));
}
catch(error: unknown) {
    let message = "error occured ";
    if (error instanceof Error)
        message += error.message;

    console.log(message);
}
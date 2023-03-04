interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

interface TargetAndDaily {
    target: number,
    daily: number[]
}

const parseArgs = (params: string[]) : TargetAndDaily => {
    if(!params[2] || !params[3])
        throw new Error("target and exercises array missing: usage npm run CalculateExercises <target> <daily[]>");

    let daily = params.slice(2);

    let exercises: number[] = [];
    
    daily.forEach((n, i) => {
        if (isNaN(Number(n))) throw new Error(`${n} is not a number`);
        exercises[i] = Number(n);
    })

    return {
        target: exercises[0],
        daily: exercises.slice(1)
    }
}

const calculateExercises = (target: number, dailExercises: number[]) : ExerciseResult => {
    const periodLength = dailExercises.length;
    const trainingDays = dailExercises.filter(e => {
        if (e !== 0) return true
        return false;
    }).length;
    const average = dailExercises.reduce((a, b) => a + b, 0)/dailExercises.length;
    const success = average >= target;
    const rating = success ? 3 : 2;
    const ratingDescription = 
        rating === 3 
            ? "Very good you met your target"
            : "not too bad but could be better"
    ;
    return { 
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { target, daily } = parseArgs(process.argv);

    console.log(calculateExercises(target, daily));
}
catch(error: unknown) {
    let message = "error occured ";
    if (error instanceof Error)
        message += error.message;

    console.log(message);
}
interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

const calculateExercises = (dailExercises: number[], target: number) : ExerciseResult => {
    const periodLength = 7;
    const trainingDays = 5;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
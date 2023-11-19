export function getGradeEmoji(grade) {
    if (grade > 90) {
        return "😄"; // Super happy face emoji for excellent grade
    } else if (grade > 80) {
        return "😊"; // Happy face emoji for good grade
    } else if (grade > 70) {
        return "🙂"; // Neutral face emoji for average grade
    } else if (grade > 60) {
        return "😐"; // Confused face emoji for below average grade
    } else if (grade > 50) {
        return "😔"; // Neutral face emoji for below average grade
    } else if (grade > 40) {
        return "😕"; // Sad face emoji for below average grade
    } else if (grade > 30) {
        return "😟"; // Worried face emoji for low grade
    } else if (grade > 20) {
        return "😢"; // Crying face emoji for very low grade
    } else if (grade > 10) {
        return "😭"; // Loudly crying face emoji for very low grade
    } else {
        return "😞"; // Super sad face emoji for extremely low grade
    }
}

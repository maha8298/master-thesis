/**
 * Computes the factorial of a non-negative integer.
 * 
 * @param {number} n - The non-negative integer for which factorial is to be calculated.
 * @returns {number} The factorial of n.
 */
function calculateFactorial(n) {
    if (n < 0) {
        throw new Error("Cannot calculate factorial of a negative number");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
        factorial *= i;
    }
    return factorial;
}

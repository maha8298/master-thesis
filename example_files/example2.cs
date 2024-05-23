using System;

class Program
{
    static void Main()
    {
        // Example usage
        int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int sumOfEvens = SumOfEvenNumbers(numbers);
        Console.WriteLine($"Sum of even numbers: {sumOfEvens}");
    }

    /// <summary>
    /// Calculates the sum of all even numbers in the given array of integers.
    /// </summary>
    /// <param name="numbers">An array of integers.</param>
    /// <returns>The sum of all even numbers in the array.</returns>
    static int SumOfEvenNumbers(int[] numbers)
    {
        int sum = 0;
        foreach (int num in numbers)
        {
            if (num % 2 == 0)
            {
                sum += num;
            }
        }
        return sum;
    }
}

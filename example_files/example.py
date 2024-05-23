def generate_fibonacci(n):
    """
    Generates a list of Fibonacci numbers up to the given number n.

    The Fibonacci sequence is a series of numbers in which each number
    is the sum of the two preceding ones, usually starting with 0 and 1.

    Parameters:
    n (int): The upper limit for the Fibonacci sequence generation.
             The function will generate Fibonacci numbers less than or equal to n.

    Returns:
    list: A list containing the Fibonacci sequence up to the number n.

    Examples:
    >>> generate_fibonacci(10)
    [0, 1, 1, 2, 3, 5, 8]

    >>> generate_fibonacci(15)
    [0, 1, 1, 2, 3, 5, 8, 13]

    >>> generate_fibonacci(0)
    [0]

    >>> generate_fibonacci(1)
    [0, 1, 1]
    """

    if n < 0:
        raise ValueError("The input must be a non-negative integer.")

    fibonacci_sequence = [0, 1]
    while True:
        next_value = fibonacci_sequence[-1] + fibonacci_sequence[-2]
        if next_value > n:
            break
        fibonacci_sequence.append(next_value)

    return fibonacci_sequence


# Example usage
if __name__ == "__main__":
    print(generate_fibonacci(10))
    print(generate_fibonacci(15))

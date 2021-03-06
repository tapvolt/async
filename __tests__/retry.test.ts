import retry from '../src/retry'

describe("Given an async function", () => {
    let fn : jest.Mock<void>

    beforeAll(() => {
        fn = jest.fn<void>();

        fn.mockImplementationOnce(() => Promise.reject("Error1"))
        fn.mockImplementationOnce(() => Promise.reject("Error2"))
        fn.mockImplementationOnce(() => Promise.resolve("Success"))
    })

    describe("When the function is called", () => {
        let result : Promise<string>

        beforeAll(() => {
            result = retry(fn, 3)
        })

        test("Then the function should retry on failure", async () => {
            expect(await result).toBe("Success");
            expect(fn).toHaveBeenCalledTimes(3)
        })
    })
})
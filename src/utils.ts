export function isError(e: unknown): e is Error {
    return (e as Error).message !== undefined;
}

export const handleResponse = (data: { name: string } | undefined, error: string, status: number | undefined) => {
    if (status === 500) {
        return "Oops... something went wrong, try again"
    }
    else if (status === 418) {
        return "418 I'm a tea pot 🫖, silly"
    }
    else if (status === 200) {

        return data?.name;
    }
    else if (error !== undefined) {
        return error
    }
}

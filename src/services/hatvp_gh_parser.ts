import axios from "axios";

const instance = axios.create({
    baseURL: "https://raw.githubusercontent.com/exploreopendatafr/hatvp_declarations_parser/main/_parsed_data",
});

export const hatvp_parser = {
    getFile: (filename: string) => instance.get(filename).then((result: any) => result.data),
};

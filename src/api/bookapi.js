import axiosClient from "./axiosClient";

const bookapi={
    getlistbook(page,query){
        const url= `/book/listbook/${page}?search=${query}`;
        return axiosClient.get(url);
    },
    getdatabook(idbook){
        const url= "/book/"+ idbook.toString();
        return axiosClient.get(url);
    },
    checkReadbook(idbook){
        const url= "/book/checkUserReadbook/"+ idbook.toString();
        return axiosClient.get(url);
    },
    buybook(idbook){
        const url= "/book/buybook/"+ idbook.toString();
        return axiosClient.get(url);
    },
    readbook(idbook,chapter){
        const url= "/book/readbook/"+ idbook.toString()+"?chapter="+chapter.toString();
        console.log(url)
        return axiosClient.get(url);
    },
    getlistchapter(idbook){
        const url= "book/listchapter/"+idbook.toString();
        return axiosClient.get(url);
    },
    getdataChapter(idbook,chapter){
        const url = `book/readbook/${idbook}?chapter=${chapter}`  // viết vớ vẩn lại được, documment nói truyền params cạnh url

        return axiosClient.get(url);
    },
    getnamebook(idbook){
        const url = `book/getNameforId/${idbook}`
        return axiosClient.get(url);
    },
    createbook(data){
        const url = "book/writebook"
        return axiosClient.post(url,data)
    },
    updatechapter(datares){
        const url="chapter/update/"+datares.idbook

        return axiosClient.post(url,datares.data)
    },
    writechap(datares){
        const url="chapter/write/"+datares.idbook
        console.log(datares.data)
        return axiosClient.post(url,datares.data)
    },
    updatebook(data,idbook){
        const url="book/updatebook/"+idbook
        console.log(idbook)
        return axiosClient.post(url,data)
    }
}
export default bookapi;
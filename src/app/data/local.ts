/* Dao is a class that implements IDao and has a constructor that takes an IDb as a parameter. */
import Ilocal from "./iLocal";

class local<T> implements Ilocal<T> {

    constructor(){}

    deleteDataInList(datas: T[], data: T, dataName: string): Promise<T> {
        // supprime la data dans la list du local storage
        datas.splice(datas.indexOf(data), 1);
        // on update le local storage
        this.updateDataList(datas, dataName);
        return Promise.resolve(data);
    }

    addDataList(datas: T[], data: T, dataName: string): Promise<T> {
        // add la data dans la list du local storage
        datas.push(data);
        // on update le local storage
        this.updateDataList(datas, dataName);
        return Promise.resolve(data);
    }
    
    setDataList(data: T[], dataName: string): Promise<T[]> {
        // add les data au local storage
        localStorage.setItem(dataName, JSON.stringify(data));
        return Promise.resolve(data);
    }
    
    updateDataList(data: T[], dataName: string): Promise<T[]> {
        //update les data au local storage
        this.deleteData(dataName);
        localStorage.setItem(dataName, JSON.stringify(data));
        return Promise.resolve(data);
    }

    setData(data: T, dataName: string): Promise<T> {
        // add les data au local storage
        localStorage.setItem(dataName, JSON.stringify(data).toString());
        return Promise.resolve(data);
    }
    
    updateData(data: T, dataName: string): Promise<T> {
        //update les data au local storage
        this.deleteData(dataName);
        localStorage.setItem(dataName, JSON.stringify(data).toString());
        return Promise.resolve(data);
    }
    
    deleteData(dataName: string): Promise<T[]> {
        //delete les data au local storage
        localStorage.removeItem(dataName);
        return Promise.resolve([]);
    }
}
export default local
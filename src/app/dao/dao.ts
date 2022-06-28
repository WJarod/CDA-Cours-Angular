/* Dao is a class that implements IDao and has a constructor that takes an IDb as a parameter. */
import IDao from "./idao";

class Dao<T> implements IDao<T> {

    constructor(){}
    
    addData(data: T[]): Promise<T[]> {
        // add les data au local storage
        localStorage.setItem('data', JSON.stringify(data));
        return Promise.resolve(data);
    }
    
    updateData(data: T[]): Promise<T[]> {
        //update les data au local storage
        this.deleteData();
        localStorage.setItem('data', JSON.stringify(data));
        return Promise.resolve(data);
    }
    
    deleteData(): Promise<T[]> {
        //delete les data au local storage
        localStorage.removeItem('data');
        return Promise.resolve([]);
    }
}
export default Dao
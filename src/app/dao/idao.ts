/* An interface that defines the methods that a DAO must implement. */
interface IDao<T> {
    // add les data au local storage
    addData(data: T[]): Promise<T[]>;
    // update les data au local storage
    updateData(data: T[]): Promise<T[]>;
    // delete les data au local storage
    deleteData(): Promise<T[]>;
}
export default IDao;
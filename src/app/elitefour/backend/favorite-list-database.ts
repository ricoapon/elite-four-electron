import {Injectable} from "@angular/core";
import {FavoriteItem, FavoriteList, FavoriteListStatus} from "./favorite-list-interfaces";
const Store = require('electron-store');

@Injectable({
  providedIn: 'root'
})
export class FavoriteListDatabase {
  private readonly store;

  constructor() {
    this.store = new Store();
    // Make sure the store exists.
    if (!this.store.has('favoriteLists')) {
      this.save([])
    }
  }

  private save(favoriteLists: FavoriteList[]) {
    this.store.set('favoriteLists', favoriteLists);
  }

  private generateListId(): number {
    return Math.max(this.store.get('favoriteLists').map(list => list.id)) + 1;
  }

  // noinspection JSMethodCanBeStatic
  private generateItemId(favoriteList: FavoriteList): number {
    return Math.max(...favoriteList.items.map(item => item.id)) + 1;
  }

  getLists(): FavoriteList[] {
    return this.store.get('favoriteLists');
  }

  createNewList(listName: string): FavoriteList {
    return {id: this.generateListId(), name: listName, status: FavoriteListStatus.CREATED, tsCreated: new Date(), items: []}
  }

  createNewItem(favoriteList: FavoriteList, itemName: string): FavoriteItem {
    return {id: this.generateItemId(favoriteList), name: itemName};
  }

  saveLists(favoriteLists: FavoriteList[]) {
    this.store.set('favoriteLists', favoriteLists);
  }

}
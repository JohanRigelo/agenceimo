import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';
import { emit } from 'process';
import { resolve } from 'dns';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { ResolveEnd } from '@angular/router';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];
  propertiesSubject = new Subject<Property[]>();

  constructor() { }

emitProperties(){
  this.propertiesSubject.next(this.properties);
}

saveProperties(){
  firebase.database().ref('/properties').set(this.properties);
}

  getProperties(){
    firebase.database().ref('/properties').on('value',(data)=>
    {
    this.properties = data.val() ? data.val() : [];
    this.emitProperties();
    }
    );
  }

  getSingleProperties(id){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/properties/'+ id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  createProperty(property: Property){
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
    console.log(property);
  }

  deleteProperty(index){
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index)
  {
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();
    // /**** ou bien **/
       firebase.database().ref('/properties/'+index).update(property).catch((error)=>{
         console.error(error);
       });
  }

  uploadfile(file: File){
    return new Promise(
      (resolve,reject)=>{
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{ console.log('chargement...');
        },
          (error)=> {
          console.error(error);
          reject(error);
          },
          () =>{
            upload.snapshot.ref.getDownloadURL().then(
              (downLoadUrl)=>{
                resolve(downLoadUrl);
              }
            )
          }
          );
      })

  }

  removeFile(fileLink : string){
    if(fileLink){
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('file deleted');
        }
      ).catch(
        (error)=>{
          console.error(error);
        }
      );

    }

  }
}

import { Injectable } from '@angular/core';
import { ToolsModel } from './tools.model';
import { SQLite, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite/ngx';


/**
 * SQLite数据库
 * @export
 * @class sqliteServiceModel
 */
@Injectable()
export class sqliteServiceModel {

    //window对象
    private win: any = window;
    //数据库对象
    private database: SQLiteObject;
    //是否android环境
    private isAndroid: boolean;
    private SQLITE_NAME:any = "zhongbaoappnew.db";
    private SQLITE_LOCATION:any = "default";
    constructor(
        public sqlite:SQLite,
        public toolsmodel: ToolsModel
        ) {
        this.isAndroid = toolsmodel.isAndroids();
    }

    /**
     * 自动判断环境创建sqlite数据库
     * @memberof SQLService
     */
    public initDB()
    {
        if (!this.win.sqlitePlugin)
        {
            //window.openDatabase("数据库名字", "版本","数据库描述",数据库大小);
            // this.database = this.win.openDatabase(SQLITE.WINDOW.name, SQLITE.WINDOW.version,
            //     SQLITE.WINDOW.describe, SQLITE.WINDOW.maxSize);
            // return;
        }
        if (this.isAndroid)
        {
            this.sqlite.create({
                name: this.SQLITE_NAME,
                location: this.SQLITE_LOCATION
            }).then((db: SQLiteObject) => {
                this.database = db;
                // let sql = 'create table IF NOT EXISTS zhongbaoappnew(tokennew VARCHAR(320))';
                // let re = this.executeSqlite(sql);
                
                // this.executeSqlite("insert into zhongbaoappnew values ( ? )", ['5555555555']);
                // let result =  this.executeSqlite('select tokennew from zhongbaoappnew', []);
                // console.log(result);
            }).catch(err => {
                console.log(err);
            });
        }
        else
        {
            // this.sqlite.create({
                // name: SQLITE.IOS.name,
                // iosDatabaseLocation: SQLITE.IOS.iosDatabaseLocation,
            // }).then((db) => {
            //     this.database = db;
            // }).catch(err => {
            //     console.log(err);
            // });
        }
    }

    /**
     * 执行sql语句
     * @param {string} sql
     * @param {*} [params={}]
     * @returns {Promise<any>}
     * @memberof SQLService
     */
    public executeSqlite(sql: string, params: any = []): Promise<any>
    {
        return new Promise((resolve, reject) => {
            try
            {
                this.database.transaction((tx: SQLiteTransaction) => {
                    tx.executeSql(sql, params, (tx, res) => {
                        resolve({tx: tx, res: res});
                    }, (tx, err) => {
                        reject({tx: tx, err: err});
                    });
                });
            }
            catch (err)
            {
                reject({err: err});
            }
        });
    }

    // createTable()
    // {
    //   let sql = 'create table IF NOT EXISTS user(id VARCHAR(32), name VARCHAR(64), sex NUMBER(8))';
    //   this.executeSql(sql).then((data) => {
    //     console.log(data);
    //   }).catch((err) => {
    //     console.log(err)
    //   });
    // }
  
    // deleteTable()
    // {
    //   let sql = 'drop table user';
    // //   this.nativeService.confirm('确定要删除user表吗？', '', () => {
    //     this.executeSql(sql).then((data) => {
    //       console.log(data);
    //     }).catch((err) => {
    //       console.log(err)
    //     });
    // //   });
    // }
  
    // insertUser()
    // {
    //   let sql = "insert into user values('"+ id +"', 'JoyoDuan" + id + "', 23)";
    //   this.executeSql(sql).then((data) => {
    //     console.log(data);
    //   }).catch((err) => {
    //     console.log(err)
    //   });
    // }
    // this.sqlite.create({
    // 		name: 'ionicdb.db',
    // 		location: 'default'
    // 	}).then((db: SQLiteObject) => {
    // 		db.executeSql('CREATE TABLE IF NOT EXISTS zhongbaoapp(token VARCHAR(320))', [])
    // 			.then(() => console.log('Executed SQL'))
    // 			.catch(e => console.log(e));
    // 		this.database = db;
    //         db.executeSql("insert into zhongbaoapp values ( ? )", ['1234567890123456789']).then(() => console.log('insert into zhongbaoapp table successfully')).catch(e => console.log(e));
    //         let result = db.executeSql('select token from zhongbaoapp', []).then((datasr) => console.log(datasr.rows.item(0))).catch(e => console.log(e));
    //         // let result = db.executeSql('select token from zhongbaoapp', []);
    //         console.log('result123');
    //         console.log(result);
    //         console.log('result123');

    // 	}).catch(e => console.log(e));

}


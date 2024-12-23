# توجه!

user: user </br>
password: user-password

---

میشه به جای چک کردن در guard ، توی APP_INITIALIZER هم چک کرد که کاربر وارد سیستم شده است یا خیر.چون با توجه به سناریو، لاگین بودن کاربر بر روی کل اپ تاثیر دارد.

in main.ts:

```typescript
{
 provide   : APP_INITIALIZER,
 useFactory: appInitializerFactory,
 multi     : true,
},
```

at top of main.ts:

```typescript
export function appInitializerFactory(appInitializerService: AppInitializerService) {
  return () =>
    appInitializerService
      .isLoggedIn()
      .then((res) => {
        // if user is logged-in then show app
      })
      .catch((error) => {
        // if user is not logged-in then show login page
      });
}
```

then create a service in 'core/services' called 'AppInitializerService'

```typescript
      .isLoggedIn()
@Injectable({
  providedIn: "root",
})
export class AppInitializerService {
  isLoggedIn() {
    let user = localStorage.getItem("user");
    return new Promise((resolve, reject) => {
      if (user) {
        resolve()
      } else{
        reject(new Error('user is not logged in'))
      }
    });
  }
}
```

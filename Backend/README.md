# project-terex

Backend powering STC@IITR main website ! 

* PUBLIC-IP 162.243.168.224
* PORT 3000


## PUBLIC - APIS

* ## Auth

  * /signIn   ->  http://162.243.168.224:30000/signIn  {POST}
    * email
    * password
  
  * /signOut    ->  http://162.243.168.224:30000/signOut {GET}

* ## Notices

  * /notice/submit   ->  http://162.243.168.224:30000/notice/submit {POST} { auth required} 
    * title
    * content 
    * date 
    * user 

  * /notice/admin/fetch  ->    http://162.243.168.224:30000/notice/admin/fetch { GET }

    @returns array of all current notices in db 


  * /notice/fetch  ->    http://162.243.168.224:30000/notice/fetch { GET }
  
    @returns array of all current approved notices in db 



   * /notice/admin/approve/:id  ->    http://162.243.168.224:30000/notice/admin/approve/:id { GET }


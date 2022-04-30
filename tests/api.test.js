const request = require('supertest');
const app = require('../sc/app.js')
const {ServerConfig} = require('API/config');

jest.setTimeout(5000);

generateStr=(length)=>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}


let server;
beforeAll(done => {
    server = app.listen(ServerConfig.PORT, () => {
        console.log(`Server is running on port ${ServerConfig.PORT}.`);
    });
    done()
});

afterAll(done => {
    // terminate the app.
    server.close()
    done()
});

describe("404 Checkek", () => {
    test("Response code must be 404", async () => {
        const response = await request(server).post("/page/404asdf")
        expect(response.statusCode).toBe(404)
    });
});

describe("Health Check", () => {
    test("Response code must be 200", async () => {
        const response = await request(server).get("/health/check")
        expect(response.statusCode).toBe(200)
    });
});

describe("Admin Services", () => {
    let fakeAdminName = "test "+ generateStr(5) + " " +generateStr(4) +" "+generateStr(3);
    let fakeAdminEmail = generateStr(10) + "@" +generateStr(5) +".com";
    let fakeAdminPasswd = generateStr(10);
    let adminToken = '';

    it('SignUp: Test without data', 
    function(done) {
        request(server).post("/api/admin/sign-up").send({
           
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
            "errors": {
                "name": [
                    "Should not be empty."
                ],
                "password": [
                    "Should not be empty."
                ],
                "email": [
                    "Invalid Email Address",
                    "Should not be empty."
                ]
            }
        },done);
    });//end it

    it('SignUp: Test with fake data, must be success', 
    function(done) {
        request(server).post("/api/admin/sign-up").send({
            "name":fakeAdminName,
            "email":fakeAdminEmail,
            "password":fakeAdminPasswd
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
            "message": "Successfully Sign Up!"
        })
        .end(function(err, res) {
             return done();
        });
    });//end it

    it('SignUp: Test with duplicate email, must be response 400 and response err msg', 
    function(done) {
        request(server).post("/api/admin/sign-up").send({
            "name":fakeAdminName,
            "email":fakeAdminEmail,
            "password":fakeAdminPasswd
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
            "errors": {
                "email": [
                    "Account already existed with this email."
                ]
            }
        },done);
    });//end it

    it('SignIn: Test with fake data, must be success', 
    function(done) {
        request(server).post("/api/admin/sign-in").send({
            "email":fakeAdminEmail,
            "password":fakeAdminPasswd
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response._body.message).toEqual('Login Success');
            adminToken = response._body.token;
            done();
        })
        .catch(err => done(err));
    });//end it

    it('helloworld: Test with valid jwt token, must be response 200', 
    function(done) {
        request(server)
        .get("/api/admin/helloworld")
        .set('x-access-token', adminToken)
        .expect('Content-Type', /json/)
        .expect(200,done);
    });//end it

    it('helloworld: Test with invalid jwt token, must be response 403', 
    function(done) {
        request(server)
        .get("/api/admin/helloworld")
        .set('x-access-token', 'fake')
        .expect('Content-Type', /json/)
        .expect(403,done);
    });//end it

});

describe("User Services", () => {
    let fakeName = "test "+ generateStr(5) + " " +generateStr(4) +" "+generateStr(3);
    let fakeEmail = generateStr(10) + "@" +generateStr(5) +".com";
    let fakePasswd = generateStr(10);
    let userToken = '';

    it('SignUp: Test without data', 
    function(done) {
        request(server).post("/api/user/sign-up").send({
           
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
            "errors": {
                "name": [
                    "Should not be empty."
                ],
                "password": [
                    "Should not be empty."
                ],
                "email": [
                    "Invalid Email Address",
                    "Should not be empty."
                ]
            }
        },done);
    });//end it

    it('SignUp: Test with fake data, must be success', 
    function(done) {
        request(server).post("/api/user/sign-up").send({
            "name":fakeName,
            "email":fakeEmail,
            "password":fakePasswd
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
            "message": "Successfully Sign Up!"
        })
        .end(function(err, res) {
             return done();
        });
    });//end it

    it('SignUp: Test with duplicate email, must be response 400 and response err msg', 
    function(done) {
        request(server).post("/api/user/sign-up").send({
            "name":fakeName,
            "email":fakeEmail,
            "password":fakePasswd
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
            "errors": {
                "email": [
                    "Account already existed with this email."
                ]
            }
        },done);
    });//end it

    it('SignIn: Test with fake data, must be success', 
    function(done) {
        request(server).post("/api/user/sign-in").send({
            "email":fakeEmail,
            "password":fakePasswd
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response._body.message).toEqual('Login Success');
            userToken = response._body.token;
            done();
        })
        .catch(err => done(err));
    });//end it

    it('helloworld: Test with valid jwt token, must be response 200', 
    function(done) {
        request(server)
        .get("/api/user/helloworld")
        .set('x-access-token', userToken)
        .expect('Content-Type', /json/)
        .expect(200,done);
    });//end it

    it('helloworld: Test with invalid jwt token, must be response 403', 
    function(done) {
        request(server)
        .get("/api/user/helloworld")
        .set('x-access-token', 'fake')
        .expect('Content-Type', /json/)
        .expect(403,done);
    });//end it

});
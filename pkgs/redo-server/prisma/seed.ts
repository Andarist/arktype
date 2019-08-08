import Photon from "@generated/photon"
const photon = new Photon()

const users = [
    ["Rebecca", "Baron"],
    ["Sarthak", "Agrawal"],
    ["David", "Blass"],
    ["Savannah", "Bosse"]
]

async function main() {
    try {
        for (const [firstName, lastName] of users) {
            try {
                const user = await photon.users.create({
                    data: {
                        email: `${firstName.toLowerCase()}@redo.qa`,
                        firstName,
                        lastName,
                        password: "p"
                    }
                })
                console.log(`🎉\nCreated user: ${JSON.stringify(user, null, 4)}\n🎉`)
            } catch (e) {
                console.log(
                    `Failed to create user ${firstName} ${lastName}:\n${e}`
                )
            }
        }
    } catch (e) {
        console.log(e)
    } finally {
        await photon.disconnect()
    }
}

main()

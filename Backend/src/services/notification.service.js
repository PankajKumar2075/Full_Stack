import { Notification } from "../models/notification.model.js";

const createNotification = async ({
    receiver,
    sender,
    type,
    post = null
}) => {

    if (receiver.toString() === sender.toString()) {
        return;
    }

    await Notification.create({
        receiver,
        sender,
        type,
        post
    });

};

export {
    createNotification
};
import { get, post, put, del } from '../utils/api';

import { createSignal, onMount, For } from "solid-js";

function Server(props) {
    const [ data, setData ] = createSignal({
        get: '',
        post: '',
        put: '',
        delete: '',
        loaded: false
    });

    const urls = {
        get: props.endpoint + '/api?input=abc',
        post: props.endpoint + '/api',
        put: props.endpoint + '/api',
        delete: props.endpoint + '/api?input=abc'
    };

    const payload = {
        a: 'A',
        b: 'B'
    };

    const parts = [
        'get',
        'post',
        'put',
        'delete'
    ];

    onMount(async () => {
        const currentData = {};
        const getResponse = await get(urls.get);
        currentData.get = JSON.stringify(getResponse.data);

        const postResponse = await post(urls.post, payload);
        currentData.post = JSON.stringify(postResponse.data);

        const putResponse = await put(urls.put, payload);
        currentData.put = JSON.stringify(putResponse.data);

        const deleteResponse = await del(urls.delete);
        currentData.delete = JSON.stringify(deleteResponse.data);

        currentData.loaded = true;
        setData(currentData);
    });

    const renderPart = type => {
        return (
            <div>
                <p>
                    <b>
                        URL:
                    </b>
                    &nbsp;
                    <span>
                      {urls[type]}
                  </span>
                </p>

                <p>
                    <b>
                        Response:
                    </b>
                    &nbsp;
                    <span>
                      {data()[type]}
                  </span>
                </p>
            </div>
        );
    }

    const renderParts = () => {
        if (data().loaded) {
            return (
                <div>
                    <For each={parts}>{ part =>
                        <>
                            {renderPart(part)}
                        </>
                    }</For>
                </div>
            );
        } else {
            return (
                <div>
                    Data not loaded
                </div>
            );
        }
    };

    return (
        <>
            {renderParts()}
        </>
    )
}

export default Server

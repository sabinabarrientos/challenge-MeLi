// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouterProps } from 'react-router-dom';

// Axios mock
const mockAxios = jest.genMockFromModule( 'axios' ) as jest.Mocked<typeof axios>;
jest.mock( 'axios', () => ({
    ...jest.requireActual( 'axios' ) as jest.Mocked<typeof axios>,
    create: jest.fn( ()=> mockAxios as jest.Mocked<typeof axios> )
}) );

// React router mock
export const mockedUsedNavigate = jest.fn();
jest.mock( 'react-router-dom', () => ({
    ...( jest.requireActual( 'react-router-dom' ) as BrowserRouterProps ),
    useNavigate: (): unknown => mockedUsedNavigate
}) );

